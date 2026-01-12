import { dummyEmails,type Email } from "./emails";


 const generateBigData = (): Email[] => {
  const targetSize = 10000;
  const bigList: Email[] = [];
  const repetitions = Math.ceil(targetSize / dummyEmails.length);

  for (let i = 0; i < repetitions; i++) {
    dummyEmails.forEach((originalEmail) => {
      const clone = { 
        ...originalEmail,
        id: `${originalEmail.id}-${i}`, 
        date: new Date(new Date(originalEmail.date).getTime() - (i * 100000)).toISOString()
      };
      
      if (bigList.length < targetSize) {
        bigList.push(clone);
      }
    });
  }

  return bigList;
};

export const hugeEmails = generateBigData();