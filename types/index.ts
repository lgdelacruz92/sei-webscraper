export type PostCollegeResponse =
  | {
      message: string;
    }
  | { error: string };

export type CollegeInfo = {
  name: string;
  city: string;
  state: string;
  code: string;
  link: string;
};

export type CollegesInfos = {
  collegesInfos: CollegeInfo[];
};

export type CodeData = {
  code: string;
};

export interface CollegesResponse {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  colleges: CollegeInfo[];
}
