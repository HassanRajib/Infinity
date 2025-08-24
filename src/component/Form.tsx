"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is requird!" }),
  lastName: z.string().min(1, { message: "last name is requird!" }),
  email: z.string().email({ message: "Invalid email eddress!" }),
  phone: z.string().min(1, { message: "Phone is requird!" }),
  birthDay: z.date({ message: "BirthDay is requird!" }),
  destination: z.enum(
    [
      "UK",
      "USA",
      "Canada",
      "Australia",
      "New Zealand",
      "Japan",
      "China",
      "Malaysia",
    ],
    { message: "destination is required" }
  ),
  elt: z.enum(
    [
      "IELTS",
      "TOEFL",
      "PT",
      "Duolingo",
      "Register for Exam",
      "Taking Preparation",
      "Yet to Appear",
    ],
    { message: "destination is required" }
  ),
  ini: z.enum(
    [
      "Jan-Feb 2026",
      "Mar-Apr 2026",
      "May-Jun 2026",
      "Jul-Aug 2026",
      "Sep-Oct 2026",
      "Nov-Dec 20",
      "Employer Scholarship",
    ],
    { message: "destination is required" }
  ),
  study: z.enum(
    [
      "English Language",
      "School",
      "Undergraduate",
      "Postgraduate",
      "Doctorate",
      "Vocational",
      "University Preparation",
    ],
    { message: "destination is required" }
  ),
  laststudy: z.enum(
    [
      "SSC",
      "O-Level",
      "Dakhil",
      "HSC",
      "A-Level",
      "Alim",
      "GED",
      "Diploma",
      "Bachelor",
      "Fazil",
      "Master’s",
      "Kamil",
    ],
    { message: "destination is required" }
  ),
});

type FormData = z.infer<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("phone");
  }, [register]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-sky-50 p-6 rounded-md space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">First name</label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full border rounded p-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Last name</label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full border rounded p-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email address</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label className="block mb-1 font-medium">WhatsApp number</label>
        <PhoneInput
          country={"bd"}
          inputStyle={{ width: "100%" }}
          containerClass="border rounded"
          onChange={(value) => setValue("phone", value)}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>
      {/* Dropdowns Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Last Education</label>
          <select
            {...register("destination")}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="SSC">SSC</option>
            <option value="O-Level">O-Level</option>
            <option value="Dakhil">Dakhil</option>
            <option value="HSC">HSC</option>
            <option value="A-Level">A-Level</option>
            <option value="Alim">Alim</option>
            <option value="GED">GED</option>
            <option value="Diploma">Diploma(4 year)</option>
            <option value="Bachelor's">Bachelor</option>
            <option value="Fazil">Fazil</option>
            <option value="Master’s">Master’s</option>
            <option value="Kamil">Kamil</option>
          </select>
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Preferred Study Level
          </label>
          <select {...register("study")} className="w-full border rounded p-2">
            <option value="">Select</option>
            <option value="English Language">English Language</option>
            <option value="School">School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Vocational">Vocational</option>
            <option value="University Preparation">
              University Preparation
            </option>
          </select>
          {errors.study && (
            <p className="text-red-500 text-sm">{errors.study.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Preferred Study Destination
          </label>
          <select
            {...register("destination")}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="Japan">Japan</option>
            <option value="Malaysia">Malaysia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
          </select>
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination.message}</p>
          )}
        </div>

<div>
        <label className="block mb-1 font-medium">Interested Intake</label>
        <select {...register("ini")} className="w-full border rounded p-2">
          <option value="">Select</option>
          <option value="Jan-Feb 2026">Jan-Feb 2026</option>
          <option value="Mar-Apr 2026">Mar-Apr 2026</option>
          <option value="May-Jun 2026">May-Jun 2026</option>
          <option value="Jul-Aug 2026">Jul-Aug 2026</option>
          <option value="Sep-Oct 2026">Sep-Oct 2026</option>
          <option value="Nov-Dec 2026">Nov-Dec 2026</option>
        </select>
        {errors.ini && (
          <p className="text-red-500 text-sm">{errors.ini.message}</p>
        )}
      </div>
        
      </div>
      
      <div>
          <label className="block mb-1 font-medium">
            English Language Certificate
          </label>
          <select {...register("elt")} className="w-full border rounded p-2">
            <option value="">Select</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PT">PT</option>
            <option value="register for exam">Register for Exam</option>
            <option value="Taking preparation">Taking preparation</option>
            <option value="Yet to appear">Yet to Appear</option>
          </select>
          {errors.elt && (
            <p className="text-red-500 text-sm">{errors.elt.message}</p>
          )}
        </div>
      <div>
        <label className="inline-flex items-start space-x-2">
          <input type="checkbox" required className="mt-1 h-4 w-4" />
          <span className="text-sm">
            I agree to Infinity Pathwayz <strong>terms</strong> and{" "}
            <strong>privacy policy</strong>.
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
