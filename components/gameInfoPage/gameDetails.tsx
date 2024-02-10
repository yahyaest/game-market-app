import parse from "html-react-parser";
import { Button, Chip } from "@nextui-org/react";
import {
 FaGamepad,
 FaPlaystation,
 FaXbox,
 FaWindows,
 FaAndroid,
 FaLinux,
 FaAppStoreIos,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { RiMacbookFill } from "react-icons/ri";

const FieldInfo = (props: { label: string; value: JSX.Element }) => {
  return (
    <div className="flex flex-col my-3">
      <p className="text-gray-600 font-bold">{props.label}</p>
      <div>{props.value}</div>
    </div>
  );
};

const PlatformIcon = (props: { platform: string }) => {
 if (props.platform === "pc") {
   return <FaWindows className="m-1" size={18} />;
 }
 if (props.platform === "linux") {
   return <FaLinux className="m-1" size={18} />;
 }
 if (props.platform === "playstation") {
   return <FaPlaystation className="m-1" size={18} />;
 }
 if (props.platform === "xbox") {
   return <FaXbox className="m-1" size={18} />;
 }
 if (props.platform === "nintendo") {
   return <SiNintendo className="m-1" size={18} />;
 }
 if (props.platform === "android") {
   return <FaAndroid className="m-1" size={18} />;
 }
 if (props.platform === "ios") {
   return <FaAppStoreIos className="m-1" size={18} />;
 }
 if (props.platform === "mac") {
   return <RiMacbookFill className="m-1" size={18} />;
 } else return <FaGamepad className="m-1" size={18} />;
};

type Props = {
  gameInfo: any;
};

export default function GameDetails({ gameInfo }: Props) {
  return (
    <>
      <h1 className="text-center text-amber-600 text-3xl font-bold">
        {gameInfo.title}
      </h1>
      <div className="grid grid-cols-1 gap-4 mx-10">
        <FieldInfo
          label={"About"}
          value={
            parse(
              gameInfo.description_html.replace(/<\/p>/g, "</p><br>")
            ) as any
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldInfo
          label={"Platforms"}
          value={gameInfo.platforms.map((platform: string) => (
            <Chip
              key={platform}
              startContent={<PlatformIcon platform={platform} />}
              color="primary"
              variant="shadow"
              className="m-1"
            >
              {platform}
            </Chip>
          ))}
        />
        <FieldInfo
          label={"Genre"}
          value={gameInfo.genres.map((genre: string) => (
            <Chip key={genre} color="danger" variant="shadow" className="m-1">
              {genre}
            </Chip>
          ))}
        />
        <FieldInfo label={"Developer"} value={gameInfo.developers.toString()} />
        <FieldInfo label={"Publisher"} value={gameInfo.publishers.toString()} />
        <FieldInfo label={"Release date"} value={gameInfo.released} />
        <FieldInfo
          label={"Metascore"}
          value={
            <Chip color="warning" variant="shadow" className="m-1">
              {gameInfo.metacritic}
            </Chip>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FieldInfo
          label={"Tags"}
          value={gameInfo.tags.map((tag: string) => (
            <Chip key={tag} color="success" variant="shadow" className="m-1">
              {tag}
            </Chip>
          ))}
        />
        <FieldInfo
          label={"Website"}
          value={
            <Button
              radius="full"
              className="bg-gradient-to-tr from-red-500 to-blue-500 text-white shadow-lg w-36"
            >
              <a href={gameInfo.website}>Visit</a>
            </Button>
          }
        />
      </div>
    </>
  );
}
