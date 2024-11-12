export interface IHeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: IHeaderProps) => (
  <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
