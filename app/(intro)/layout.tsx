import Footer from './_components/footer'

type Props = {
  children: React.ReactNode
}

const IntroLayout = ({ children }: Props) => {
  return <main>{children}<Footer /></main>
}
export default IntroLayout
