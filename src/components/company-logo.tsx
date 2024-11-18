import Image from 'next/image';
interface CompanyLogoProps {
  width?: number;
  height?: number;
  className?: string;
  loading?: boolean;
}

export const CompanyLogo = ({
  width,
  height,
  loading = false,
  className,
}: CompanyLogoProps) => {
  return (
    <Image
      src={loading ? '/logos/my-mind-loader.svg' : '/logos/my-mind.svg'}
      alt="Logo do sistema"
      width={width || 36}
      height={height || 36}
      className={className}
    />
  );
};
