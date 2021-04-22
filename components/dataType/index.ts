export interface question {
  id?: string;
  title?: string;
  name?: string;
  likes?: string;
  avatar?: string;
  collections?: number;
  replies?: number;
  description?: string;
  content?: string;
  html: string;
  create_time?: string;
}
export interface image {
  id?: string;
  address?: string;
  alt?: string;
  uid?: string;
}
export interface reply {
  id: string;
  qid: string;
  uid: string;
  name: string;
  avatar?: string;
  html: string;
  create_time: string;
  reply: replyInReply[];
}
export interface replyInReply {
  id: string;
  rid: string;
  uid: string;
  name: string;
  ruid?: string;
  rname?: string;
  avatar?: string;
  content: string;
  create_time: string;
}
export interface bookReply {
  id: string;
  name: string;
  uid: string;
  avatar: string;
  context: string;
  star: number;
  create_time: string;
}

export interface book {
  id: string;
  uid?: string;
  title: string;
  author: string;
  price: number;
  description: string;
  image: string;
  imageId?: string;
  reply: bookReply[];
}
export interface blog {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  likes: string;
  collections: string;
  title: string;
  content: string;
  html: string;
  create_time: string;
}
