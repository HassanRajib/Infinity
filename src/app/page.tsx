import { Form } from "@/component/Form";
import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <h2 className="flex flex-row font-bold text-2xl mt-3">
        Greetings
      </h2>
      <p>
        We are here to provide you A-to-Z support for pursuing study abroad.
        Helping you to get enrolled into aptly suitable institute following your
        desired destination is our main motto. Just let us have little bit of
        you to enjoy the happiest flight ever!
      </p>
      <div className="flex flex-row-reverse items-center justify-between m-7">
        <div className="">
          <Form />
        </div>
        <div>
          <Image src="/person.png" alt="student" width={512} height={1000} />
        </div>
      </div>
    </div>
  );
}
