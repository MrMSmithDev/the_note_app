export default interface LocalDataStruct {
  [month: number]: {
    [date: number]: { index: number; data: string }[];
  };
}
