import { Heading, SM } from '@/components/typography';

export interface IHeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: IHeaderProps) => (
  <div className="flex flex-col gap-2">
    <Heading as="h3">{title}</Heading>
    <SM as="400" className="text-muted-foreground">
      {description}
    </SM>
  </div>
);
