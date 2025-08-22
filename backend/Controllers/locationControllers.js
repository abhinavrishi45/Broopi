const Location = require('../Models/locationModel');

exports.saveLocation = async (req, res)=>{
  const {latitude, longitude, address, society , userId} = req.body;

  try {
    const location = new Location({latitude, longitude, address, society , userId});
    await location.save();
    res.status(201).json({message: 'Location Saved' , location});

  }
  catch(error){
    res.status(500).json({message: 'Error Saving Location' , error});
  }
};