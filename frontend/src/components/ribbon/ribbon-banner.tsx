import './ribbon-banner.css'

export const RibbonBanner = ({ text = 'Coming soon' }: { text: string }) => {
  return (
    <div className='ribbon ribbon-top-right'>
      <span>{text}</span>
    </div>
  )
}
