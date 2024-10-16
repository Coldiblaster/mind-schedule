import Image from 'next/image';
interface CompanyLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const CompanyLogo = ({ width, height, className }: CompanyLogoProps) => {
  return (
    <Image
      src="/logos/my-mind.svg"
      alt="Logo do sistema"
      width={width || 36}
      height={height || 36}
      className={className}
    />
  );
};
