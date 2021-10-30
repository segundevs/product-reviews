import { Oval } from 'react-loading-icons';

const PageLoader = () => {
  return (
    <div className="page-loader">
      <Oval 
    stroke='#112d4e'
    height='3em'
    strokeWidth={3}
    speed={2}
    width="3em"
    />
    </div>
  )
}

export default PageLoader
