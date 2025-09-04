"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaChevronRight } from "react-icons/fa";;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is requird!" }),
    lastName: z.string().min(1, { message: "last name is requird!" }),
    email: z.string().email({ message: "Invalid email address!" }).optional(),
    phone: z.string().min(1, { message: "Phone is required!" }),
    destination: z.string().refine(
  (val) =>
    [
      "Australia",
      "Canada",
      "China",
      "Europe",
      "Japan",
      "Malaysia",
      "New Zealand",
      "UK",
      "USA",
    ].includes(val),
  { message: "Destination is required" }
),
    europeCountry: z.string().optional(),
    elt: z.enum(
      [
        "IELTS",
        "IELTS UKVI",
        "TOEFL",
        "PTE",
        "Duolingo",
        "Register for Test",
        "Taking Preparation",
        "Waiting for Test Score",
      ],
      { message: "ELT is required" }
    ),
    eltScore: z.string().optional(),
    ini: z
      .enum(
        [
          "soon",
          "Jan-Feb 2026",
          "Feb-Mar 2026",
          "Mar-Apr 2026",
          "Apr-May 2026",
          "May-Jun 2026",
          "Jun-Jul 2026",
          "Jul-Aug 2026",
          "Aug-Sep 2026",
          "Sep-Oct 2026",
          "Oct-Nov 2026",
          "Nov-Dec 2026",
        ],
        { message: "Intake is required" }
      ).optional(),
    study: z.enum(
      [
        "School",
        "Vocational",
        "Diploma",
        "Undergraduate",
        "Postgraduate",
        "Doctorate",
      ],
      { message: "Study is required" }
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
        "Master",
        "Kamil",
      ],
      { message: "Education is required" }
    ),
  })
  .superRefine((data, ctx) => {
    if (data.destination === "Europe" && !data.europeCountry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["europeCountry"],
        message: "Please select a European country",
      });
    }
    if (
      ["IELTS", "IELTS UKVI", "TOEFL", "PTE", "Duolingo"].includes(data.elt) &&
      !data.eltScore
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["eltScore"],
        message: "Please enter your test score",
      });
    }
  });

type FormData = z.infer<typeof schema>;

const europeanCountries = [
  "Austria", "Denmark", "France", "Italy", "Hungary", "Netherlands", "Norwya", "Spain", "Sweden", "Switzerland",
];

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
    },
  });

  const [statusMessage, setStatusMessage] = useState("");

  const selectedDestination = watch("destination");
  // const selectedElt = watch("elt");
  const selectedEuropeCountry = watch("europeCountry");

  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] =
    useState(false);
  const [isEuropeHovered, setIsEuropeHovered] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDestinationDropdownOpen(false);
        setIsEuropeHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    register("phone");
  }, [register]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${apiUrl}api/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatusMessage("Student info submitted successfully!");
        reset(); // clear form after success
      } else {
        setStatusMessage("Failed to submit student info.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatusMessage("Server error. Please try again.");
    }
  };

  const handleEuropeCountrySelect = (country: string) => {
    setValue("destination", "Europe", { shouldValidate: true });
    setValue("europeCountry", country, { shouldValidate: true });
    setIsDestinationDropdownOpen(false);
    setIsEuropeHovered(false);
  };

  const destinations = [
    "Australia",
    "Canada",
    "China",
    "Europe",
    "Japan",
    "Malaysia",
    "New Zealand",
    "UK",
    "USA",
  ];

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
        {/* {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )} */}
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
            {...register("laststudy")}
            className="w-full border rounded p-2 h-10"
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
            <option value="Bachelor">Bachelors</option>
            <option value="Fazil">Fazil</option>
            <option value="Master">Master</option>
            <option value="Kamil">Kamil</option>
          </select>
          {errors.laststudy && (
            <p className="text-red-500 text-sm">{errors.laststudy.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Preferred Study Level
          </label>
          <select {...register("study")} className="w-full border rounded p-2 h-10">
            <option value="">Select</option>
            <option value="School">School</option>
            <option value="Vocational">Vocational</option>
            <option value="Diploma">Diploma</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Doctorate">Doctorate</option>
          </select>
          {errors.study && (
            <p className="text-red-500 text-sm">{errors.study.message}</p>
          )}
        </div>
        <div className="relative" ref={dropdownRef}>
          <label className="block mb-1 font-medium">
            Preferred Destination
          </label>
          <button
            type="button"
            onClick={() =>
              setIsDestinationDropdownOpen(!isDestinationDropdownOpen)
            }
            className="w-full flex justify-between items-center border rounded p-2 text-left"
          >
            <span>
              {selectedEuropeCountry || selectedDestination || "Select"}
            </span>
            <FaChevronRight className="h-4 w-4 rotate-90" />
          </button>

          {isDestinationDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              <ul className="py-1">
                {destinations.map((dest) => (
                  <li
                    key={dest}
                    className="relative group px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseEnter={() =>
                      dest === "Europe" && setIsEuropeHovered(true)
                    }
                    onMouseLeave={() =>
                      dest === "Europe" && setIsEuropeHovered(false)
                    }
                    onClick={() => {
                      if (dest !== "Europe") {
                        setValue("destination", dest, { shouldValidate: true });
                        setValue("europeCountry", "");
                        setIsDestinationDropdownOpen(false);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{dest}</span>
                      {dest === "Europe" && (
                        <FaChevronRight className="h-4 w-4" />
                      )}
                    </div>

                    {/* Europe submenu */}
                    {dest === "Europe" && isEuropeHovered && (
                      <ul className="absolute left-full top-0 ml-1 bg-white border rounded-md shadow-lg w-48 py-1">
                        {europeanCountries.map((country) => (
                          <li
                            key={country}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEuropeCountrySelect(country);
                            }}
                          >
                            {country}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
          {errors.europeCountry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.europeCountry.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Interested Intake</label>
          <select {...register("ini")} className="w-full border rounded p-2 h-10">
            <option value="">select</option>
            <option value="soon">Next Available Intake</option>
            <option value="Jan-Feb 2026">Jan-Feb 2026</option>
            <option value="Feb-Mar 2026">Feb-Mar 2026</option>
            <option value="Mar-Apr 2026">Mar-Apr 2026</option>
            <option value="Apr-May 2026">Apr-May 2026</option>
            <option value="May-Jun 2026">May-Jun 2026</option>
            <option value="Jun-Jul 2026">Jun-Jul 2026</option>
            <option value="Jul-Aug 2026">Jul-Aug 2026</option>
            <option value="Aug-Sep 2026">Aug-Sep 2026</option>
            <option value="Sep-Oct 2026">Sep-Oct 2026</option>
            <option value="Oct-Nov 2026">Oct-Nov 2026</option>
            <option value="Nov-Dec 2026">Nov-Dec 2026</option>
          </select>
          {/* {errors.ini && (
            <p className="text-red-500 text-sm">{errors.ini.message}</p>
          )} */}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            English Language Certificate
          </label>
          <select {...register("elt")} className="w-full border rounded p-2 h-10">
            <option value="">Select</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE">PTE</option>
            <option value="Duolingo">Duolingo</option>
            <option value="Others">Others</option>
            <option value="Taking Preparation">Taking Preparation</option>
            <option value="Register for Test">Register for Test</option>
            <option value="Waiting for Test Score">
              Waiting for Test Score
            </option>
          </select>
          {errors.elt && (
            <p className="text-red-500 text-sm">{errors.elt.message}</p>
          )}
        </div>
        {["IELTS", "TOEFL", "PTE", "Duolingo"].includes(watch("elt")) && (
          <div>
            <label className="block mb-1 font-medium">Test Score</label>
            <input
              type="text"
              {...register("eltScore", {
                required: "Please enter your score",
              })}
              placeholder="Enter your score"
              className="w-full border rounded p-2 h-10"
            />
            {errors.eltScore && (
              <p className="text-red-500 text-sm">{errors.eltScore.message}</p>
            )}
          </div>
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
      {statusMessage && (
    <p
      className={`text-sm mt-2 ${
        statusMessage.includes("success")
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {statusMessage}
    </p>
  )}

    </form>
  );
};
