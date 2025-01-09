import { SvgIcon } from '@/components/Image'

export default function LoginTypeSwitcher({ loginType, handleChangeLoginType }) {
  return (
    <p className="flex mt-4 text-sm cursor-pointer" onClick={handleChangeLoginType}>
      Switch to {loginType === 'verifyCode' ? 'password' : 'verify code'} login
      <SvgIcon
        name="change"
        size={14}
        className="ml-2"
      />
    </p>
  )
}
