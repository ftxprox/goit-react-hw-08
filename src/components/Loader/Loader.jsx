import { InfinitySpin } from 'react-loader-spinner'
import css from './Loader.module.css'

const Loader =()=>{
return <div className={css.loader}>
    <InfinitySpin
  visible={true}
  width="200"
  color="#FF9900"
  ariaLabel="infinity-spin-loading"/>
    </div>
}
export default Loader