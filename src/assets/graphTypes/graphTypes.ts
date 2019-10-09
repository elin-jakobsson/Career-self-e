interface SelfevalObject {
  id: number;
  name: string;
  experience: number;
  interest: number;
  imgUrl: string;
  websiteUrl: string;
}

interface UserObject {
  name: string;
  tools: [];
  imgUrl: string;
}

export { SelfevalObject, UserObject };
