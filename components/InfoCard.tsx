import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "../utils/material-tailwind-exports";
import Image from "next/image";

const InfoCard = ({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: string;
}) => {
  return (
    <Card className="lg:w-[90%] max-w-[48rem] flex-row md:h-60 rounded-r-sm ">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none rounded-l-sm"
      >
        <Image
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
          fill
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2 text-xl">
          {title}
        </Typography>
        <Typography
          color="gray"
          className="mb-8 font-normal text-sm md:text-base"
        >
          {text}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
