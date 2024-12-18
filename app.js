const prompt = require("prompt-sync")()
const Customer = require("./models/Customer.js")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

mongoose.connect(process.env.MONGODB_URI)

const createCustomer = async () => {
  const customerName = prompt("The customer's name: ")
  const customerAge = prompt("The customer's age: ")
  const customers = [{ name: customerName, age: customerAge }]
  await Customer.create(customers)
  customerApp()
}

const viewCustomers = async () => {
  const customers = await Customer.find()

  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
  customerApp()
}

const updateCustomer = async () => {
  const customers = await Customer.find()
  console.log("Here is a list of customers:")

  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })

  const customerId = prompt(
    " Enter the id of the customer you would like to update: "
  )
  const customerNameUpdate = prompt("The customer's new name? ")
  const customerAgeUpdate = prompt("The customer's new age? ")
  await Customer.findByIdAndUpdate(customerId, {
    name: customerNameUpdate,
    age: customerAgeUpdate,
  })
  customerApp()
}

const deleteCustomer = async () => {
  const customers = await Customer.find()
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })

  const customerId = prompt(
    "Enter the id of the customer you would like to delete: "
  )
  await Customer.findByIdAndDelete(customerId)
  customerApp()
}

const customerApp = async () => {
  console.log(
    "Welcome to the CRM  What would you like to do? 1. Create a customer  2. View all customers  3. Update a customer  4. Delete a customer 5. Quit"
  )
  const Option = prompt("Choose the number of action to start: ")
  await connect()

  if (Option === "1") {
    await createCustomer()
  } else if (Option === "2") {
    await viewCustomers()
  } else if (Option === "3") {
    await updateCustomer()
  } else if (Option === "4") {
    await deleteCustomer()
  } else if (Option === "5") {
    await mongoose.connection.close()
    console.log("exiting...")
    process.exit()
  } else {
    console.log("Please try again")
  }
}

customerApp()
