// module dependencies
const mongoose    = require('mongoose');
const validation  = require(`${__models}/User/validation`);

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    required: [true, vars.validator.required],
    validate: validation.email
  },
  
  password: {
    type: String,
    required: [true, vars.validator.required],
    select: false,
    validate: validation.password
  },

  profile: {
    name: { 
      type: String,
      default: '',
      validate: validation.name
    },

    lastName: { 
      type: String,
      default: '',
      validate: validation.lastname
    },

    role: { 
      type: String, 
      default: 'USER' 
    },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);