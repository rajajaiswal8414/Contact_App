import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import UseDisclosure from "../hooks/UseDisclosure";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { useState } from "react";
import { toast } from "react-toastify";
import NotFoundContact from "./NotFoundContact";

const ContactCard = ({ contacts }) => {
  const { isOpen, onClose, onOpen } = UseDisclosure();
  const [selectedContact, setSelectedContact] = useState(null);

  const deleteContant = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = (contact) => {
    setSelectedContact(contact);
    onOpen();
  };

  return (
    <>
      <div className="mt-4">
        {contacts.length <= 0 ? (
          <NotFoundContact />
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="mt-3 flex items-center justify-between rounded-lg bg-[#FFEAAE] p-2"
            >
              <div className="flex items-center gap-2">
                <HiOutlineUserCircle className="text-3xl text-[#F6820C]" />
                <div className="">
                  <h2 className="font-medium">{contact.name}</h2>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </div>
              <div className="flex text-3xl">
                <RiEditCircleLine
                  onClick={() => editContact(contact)}
                  className="cursor-pointer"
                />
                <IoMdTrash
                  onClick={() => deleteContant(contact.id)}
                  className="cursor-pointer text-[#F6820C]"
                />
              </div>
            </div>
          ))
        )}
      </div>
      <AddAndUpdateContact
        contact={selectedContact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
