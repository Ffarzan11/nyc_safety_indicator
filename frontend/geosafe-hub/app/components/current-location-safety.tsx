"use client"

import { useState } from "react"
import { Phone, Trash2, Plus, ChevronDown, User, Check } from "lucide-react"

export default function EmergencyContactsManager() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jane Doe", relationship: "Family", phone: "+1 (555) 987-6543", carrier: "Verizon" },
  ])

  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    carrier: "",
  })

  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false)
  const carriers = ["AT&T", "Verizon", "T-Mobile", "Sprint", "Other"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddContact = (e) => {
    e.preventDefault()

    // Simple validation
    if (!newContact.firstName || !newContact.lastName || !newContact.phone) {
      alert("Please fill out all required fields")
      return
    }

    // Create new contact
    const newContactEntry = {
      id: Date.now(), // Simple ID generation
      name: `${newContact.firstName} ${newContact.lastName}`,
      phone: newContact.phone,
      carrier: newContact.carrier,
      relationship: "Contact", // Default relationship
    }

    // Add to contacts list
    setContacts([...contacts, newContactEntry])

    // Reset form
    setNewContact({ firstName: "", lastName: "", phone: "", carrier: "" })
  }

  const handleDeleteContact = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((contact) => contact.id !== id))
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Emergency Contacts</h2>

      {/* Add Contact Form */}
      <div className="mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Add New Emergency Contact</h3>

        <form onSubmit={handleAddContact}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/70"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newContact.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/70"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-blue-300" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/70"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="carrier" className="block text-sm font-medium text-white mb-1">
              Carrier (Optional)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{newContact.carrier || "Select Carrier"}</span>
                <ChevronDown size={16} />
              </button>

              {showCarrierDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  {carriers.map((carrier) => (
                    <div
                      key={carrier}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                        carrier === newContact.carrier ? "bg-blue-900" : ""
                      }`}
                      onClick={() => {
                        setNewContact((prev) => ({ ...prev, carrier }))
                        setShowCarrierDropdown(false)
                      }}
                    >
                      <div className="flex items-center">
                        {carrier === newContact.carrier && <Check className="h-4 w-4 text-blue-400 mr-2" />}
                        <span className="text-white">{carrier}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Emergency Contact
          </button>
        </form>
      </div>

      <h3 className="text-xl font-semibold text-white mb-4">Your Emergency Contacts</h3>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h4 className="font-medium text-white">{contact.name}</h4>
              <div className="text-sm text-blue-200 flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {contact.phone}
                {contact.carrier && <span className="ml-1">({contact.carrier})</span>}
              </div>
            </div>
            <button
              onClick={() => handleDeleteContact(contact.id)}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
              aria-label={`Delete ${contact.name}`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
