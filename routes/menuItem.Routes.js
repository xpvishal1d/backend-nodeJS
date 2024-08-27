const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem')

router.post('/' , async (req , res) =>{
    try {
      const data = req.body;
  
      const newMenuItem = new MenuItem(data)
  
      const response = await newMenuItem.save();
       
      console.log('data saved');
      res.status(200).json(response);
  
  
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'internqal server error'})
    }
  })
  
  
  // data fetching menu item
  
  router.get('/', async (req , res) => {
   try {
     const data = await MenuItem.find();
     console.log('data feched  menu item');
     res.status(200).json(data);
   } catch (err) {
    console.log(err);
    res.status(500).json({error : 'internqal server error'})
   }
  })




  router.get('/:taste' ,async (req , res ) =>{
    try {
      const taste = req.params.taste;
    
      if (taste == 'Sweet' || taste == 'Spicy' || taste == 'Sour'  ) {
        const response = await MenuItem.find({taste : taste});
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

   // update karana
  router.put('/:id' ,async (req , res ) =>{
    try {
      const menuId = req.params.id;
    
     const menuUpdated = req.body ;

     const updateMenuitem = await MenuItem.findByIdAndUpdate( menuId , menuUpdated , {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
  
     })
     if (!updateMenuitem) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send the updated person data as a JSON response
      res.json(updateMenuitem);
  
        

    } catch (err) {
     console.log(err);
     res.status(500).json({error : 'internqal server error'})
    }
   } )


   // delete item fro GPT

   router.delete('/:id', async (req, res) => {
    try {
      const menuId = req.params.id;
  
      const deleteMenuItem = await MenuItem.findByIdAndDelete(menuId);
  
      if (!deleteMenuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
  
      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  module.exports = router ;