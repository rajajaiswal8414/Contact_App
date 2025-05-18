import { ErrorMessage, Field, Form, Formik } from "formik";
import Model from "./Model";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ onClose, isOpen, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate && contact
              ? {
                  name: contact.name || "",
                  email: contact.email || "",
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values, { resetForm }) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
            resetForm();
            onClose();
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border pl-2" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="h-10 border pl-2" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              className="self-end border bg-[#F6820C] px-3 py-1.5"
            >
              {isUpdate ? "update" : "add"} contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
