const express = require('express')
const addressControl = require('../controller/addressControl')
const auth = require('../middleware/auth')
const {addressValidation , validateSchema} = require('../validation/addressValidation')
const router = express.Router()

router.get('/api/data/getAddress',auth,  addressControl.getAddress)
router.get('/api/data/getAddressID/:_id', auth, addressControl.getAddressID)

router.post('/api/data/postAddress',
addressValidation(),validateSchema,auth,
addressControl.postAddress)

router.put('/api/data/putAddress/:_id',
 addressValidation(),validateSchema,
 addressControl.putAddress)


 router.delete('/api/data/deleteAddress/:_id', auth,addressControl.deleteAddress)

module.exports = router