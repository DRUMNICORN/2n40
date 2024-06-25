import React from "react";
import {
  MdAdd,
  MdCalendarViewWeek,
  MdGroups,
  MdInfo,
  MdOutlineCalendarMonth,
  MdPages,
  MdPerson,
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
} from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { BiSolidNetworkChart } from "react-icons/bi";
import { IoMdPricetag } from "react-icons/io";
import { ViewType } from "./types";
import { MetadataTypes } from "./types";

// Icons mapping for different views
export const VIEW_ICONS: { [key: string]: JSX.Element } = {
  [ViewType.CalendarDays]: <MdCalendarViewWeek />,
  [ViewType.Carousel]: <MdViewCarousel />,
};

// Icons mapping for different categories
export const CATEGORY_ICONS: { [key: string]: JSX.Element } = {
  collaborations: <MdOutlineCalendarMonth />,
  collectives: <MdGroups />,
  // creatives: <MdPerson />,
  // concepts: <MdPages />,
};

// Icons mapping for different filters
export const FILTER_ICONS: { [key: string]: JSX.Element } = {
  costs: <IoMdPricetag />,
  time: <IoTimeSharp />,
  concepts: <FaHashtag />,
  connections: <BiSolidNetworkChart />,
};

// Icons mapping for social media and metadata types
export const SOCIAL_MEDIA_ICONS: { [key in MetadataTypes]: JSX.Element } = {
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
  [MetadataTypes.creatives]: <MdGroups />,
  [MetadataTypes.info]: <MdInfo />
};
