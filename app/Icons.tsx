import React from "react";
import {
  MdAdd,
  MdCalendarViewWeek,
  MdClose,
  MdGroups,
  MdInfo,
  MdOutlineCalendarMonth,
  MdPages,
  MdPerson,
  MdShare,
  MdViewCarousel,
  MdWeb,
} from "react-icons/md";
import {
  FaHashtag,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaYoutube,
  FaSoundcloud,
  FaSpotify,
  FaBandcamp,
  FaTelegramPlane,
  FaTwitter,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { IoLogIn, IoTimeSharp } from "react-icons/io5";
import { BiSolidNetworkChart } from "react-icons/bi";
import { IoMdPricetag } from "react-icons/io";
import { MetadataTypes } from "./types";

// Icons mapping for social media and metadata types
export const REACT_ICONS: { [key in MetadataTypes]: JSX.Element } = {
  [MetadataTypes.website]: <MdWeb />,
  [MetadataTypes.mail]: <FaEnvelope />,
  [MetadataTypes.address]: <FaMapMarkerAlt />,
  [MetadataTypes.tel]: <FaPhone />,
  [MetadataTypes.date]: <MdCalendarViewWeek />,
  [MetadataTypes.instagram]: <FaInstagram />,
  [MetadataTypes.youtube]: <FaYoutube />,
  [MetadataTypes.soundcloud]: <FaSoundcloud />,
  [MetadataTypes.price]: <IoMdPricetag />,
  [MetadataTypes.spotify]: <FaSpotify />,
  [MetadataTypes.facebook]: <FaFacebook />,
  [MetadataTypes.bandcamp]: <FaBandcamp />,
  [MetadataTypes.telegram]: <FaTelegramPlane />,
  [MetadataTypes.twitter]: <FaTwitter />,
  [MetadataTypes.add]: <MdAdd />,
  [MetadataTypes.name]: <MdPerson />,
  [MetadataTypes.time]: <IoTimeSharp />,
  [MetadataTypes.connections]: <BiSolidNetworkChart />,
  [MetadataTypes.concepts]: <FaHashtag />,
  [MetadataTypes.description]: <MdPages />,
  [MetadataTypes.category]: <MdGroups />,
  [MetadataTypes.collectives]: <MdGroups />,
  [MetadataTypes.creatives]: <MdPerson />,
  [MetadataTypes.info]: <MdInfo />,
  [MetadataTypes.close]: <MdClose />,
  [MetadataTypes.share]: <MdShare />,
  [MetadataTypes.collaborations]: <MdOutlineCalendarMonth />,
  [MetadataTypes.form]: <IoLogIn />,
  [MetadataTypes.days]: <MdCalendarViewWeek />,
  [MetadataTypes.carousel]: <MdViewCarousel />,
  [MetadataTypes.weeks]: <MdCalendarViewWeek />,
  [MetadataTypes.github]: <FaGithub />
};
