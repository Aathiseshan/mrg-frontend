import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "../styles/form.module.css";
import watermark from "../assets/watermark.png";

export default function MarriageForm() {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    age: "",
    gothram: "",
    subCategory: "",
    location: "",
    whatsapp: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please fill the name"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    gender: Yup.string().required("Please select gender"),
    age: Yup.number()
      .min(18, "Age must be at least 18")
      .required("Age is required"),
    gothram: Yup.string().required("Gothram is required"),
    subCategory: Yup.string().required("Sub Category is required"),
    location: Yup.string().required("Location/City is required"),
    whatsapp: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit WhatsApp number")
      .required("WhatsApp number is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      // 1️⃣ Save locally (optional)
      const existing = JSON.parse(localStorage.getItem("marriageForms")) || [];
      const updated = [...existing, values];
      localStorage.setItem("marriageForms", JSON.stringify(updated));

      // 2️⃣ Send to backend API for email
      const response = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        resetForm();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Backend response error:", data);
        alert("❌ Failed to send email. Try again.");
      }
    } catch (err) {
      console.error("Error sending mail:", err);
      alert("❌ Error connecting to server.");
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${watermark})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "300px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundBlendMode: "screen",
      }}
    >
      <h2>Sri Maha Periyava Temple, Karur – Marriage Info Form</h2>
      <p>
        Kindly share the details of unmarried Brahmin boys or girls for
        potential marriage alliances.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <label htmlFor="name">Full Name *</label>
          <Field name="name" type="text" placeholder="Enter full name" />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor="email">Email Address *</label>
          <Field name="email" type="email" placeholder="Enter email" />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label htmlFor="gender">Boy / Girl *</label>
          <div className={styles["select-wrapper"]}>
            <Field name="gender" as="select">
              <option value="">-- Select --</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </Field>
          </div>
          <ErrorMessage
            name="gender"
            component="div"
            className={styles.error}
          />

          <label htmlFor="age">Age *</label>
          <Field name="age" type="number" placeholder="Enter age" />
          <ErrorMessage name="age" component="div" className={styles.error} />

          <label htmlFor="gothram">Gothram *</label>
          <Field name="gothram" type="text" placeholder="Enter Gothram" />
          <ErrorMessage
            name="gothram"
            component="div"
            className={styles.error}
          />

          <label htmlFor="subCategory">Sub Category *</label>
          <Field
            name="subCategory"
            type="text"
            placeholder="Enter Sub Category"
          />
          <ErrorMessage
            name="subCategory"
            component="div"
            className={styles.error}
          />

          <label htmlFor="location">Location / City *</label>
          <Field
            name="location"
            type="text"
            placeholder="Enter city or location"
          />
          <ErrorMessage
            name="location"
            component="div"
            className={styles.error}
          />

          <label htmlFor="whatsapp">WhatsApp Number *</label>
          <Field
            name="whatsapp"
            type="text"
            placeholder="Enter 10-digit WhatsApp number"
          />
          <ErrorMessage
            name="whatsapp"
            component="div"
            className={styles.error}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      {submitted && (
        <p className={styles.success}>✅ Mail sent successfully!</p>
      )}
    </div>
  );
}
