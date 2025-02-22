export default interface LocalDataStruct {
  [month: number]: {
    [date: number]: { id: string; data: string }[];
  };
}
