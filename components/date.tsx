import { parseISO, format } from 'date-fns';

export const Date: React.FC<{ date: string }> = ({ date }) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'LLLL d, yyyy');
  return <time dateTime={date}>{formattedDate}</time>;
};
