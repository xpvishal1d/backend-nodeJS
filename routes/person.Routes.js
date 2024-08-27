const express = require('express');
const router = express.Router();

const Person = require('./../models/Person')



router.post('/' , async (req , res)=>{

    try {
      const data = req.body;
  
      const newPerson= new Person(data)
  
      const response = await newPerson.save();
  
      console.log('data saved');
      res.status(200).json(response);
      
  
  
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'internqal server error'})
      
    }
      
  })


  
  router.get('/' , async (req , res )=>{
    try {
      const data = await Person.find();
      console.log('data feched');
      res.status(200).json(data);
    } catch (err) {
      onsole.log(err);
      res.status(500).json({error : 'internqal server error'})
    }
  })

  

  router.get('/:worktype' ,async (req , res ) =>{
    try {
      const worktype = req.params.worktype;
    
      if (worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'  ) {
        const response = await Person.find({work : worktype});
        console.log('data feched  menu item');
       res.status(200).json(response);
      }
   
      else{
       res.status(404).json({error:"invalid work type"})
      }
    } catch (err) {
     console.log(err);
     res.status(500).json({error : 'internqal server error'})
    }
   } )

   router.put('/:Id' , async (req , res) => {
   try {
     const personId = req.params.Id;
 
     const dataThatsUpdata = req.body;
 
     const updatedPerson = await Person.findByIdAndUpdate( personId , dataThatsUpdata , {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
  
     })
     if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send the updated person data as a JSON response
      res.json(updatedPerson);
  




   } catch (error) {
    console.log(err);
    res.status(404).json({error : 'person not found'})
   }


   })

   router.delete('/:id' , async (req , res) =>{
    try {
         const   personId = req.params.id;
    
         const deletePerson = await  Person.findByIdAndDelete(personId)

        if (!deletePerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    
    }

   })

   module.exports = router ;