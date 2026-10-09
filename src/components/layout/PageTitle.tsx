export const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <>
      <div class='pblur-cont'>
        <div class='blur-filter' />
        <div class='blur-filter' />
        <div class='blur-filter' />
        <div class='blur-filter' />
        <div class='gradient' />
      </div>
      
      <div class='title-box'>
        <h2>{title}</h2>
        {subtitle && (
          <div class='subtitle-box'>
            <div class='indent-bar' />
            <p>{subtitle}</p>
          </div>
        )}
      </div>
    </>
  );
};
