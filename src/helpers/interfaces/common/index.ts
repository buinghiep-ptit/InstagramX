export type MapBoxAddress = {
  id?: string;
  place_name?: string;
  keyword?: string[];
  avatarURI?: string;
  sources?: number[];
  storySources?: number[];
  center?: [number, number];
};
