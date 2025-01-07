// Email.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
  Img,
} from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  message: string;
  phone: string;
  address: string;
  images: string[]; // Array of image URLs
}

export const Email: React.FC<Readonly<EmailProps>> = ({
  name,
  email,
  message,
  phone,
  address,
  images,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              You got a message!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello Stuart,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You got an email from <strong>{name}</strong>.
              <br /><br />
              <span className="bold uppercase">Their details:</span> <br/>
              <span className="underline">Email address:</span> {email}
              <br />
              <span className="underline">Location:</span> {address}.
              <br />
              <span className="underline">Contact number:</span> {phone}.
              <br /><br />
              <span className="underline"><strong>Message:</strong></span> <br />
              {message} <br />
              {images && images.length > 0 && (
                <>
                  <br />
                  <span className="underline"><strong>Uploaded Images:</strong></span>
                  <br />
                  <div className="flex flex-wrap">
                    {images.map((url, index) => (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                      <Img
                        src={url}
                        alt={`Uploaded Image ${index + 1}`}
                        className="w-32 h-32 object-cover m-1"
                      />
                    </a>
                    ))}
                  </div>
                </>
              )}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
