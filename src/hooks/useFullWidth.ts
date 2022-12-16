import useIsStandalonePWA from 'hooks/useIsStandalonePWA'

const useFullWidth = () => {
  return useIsStandalonePWA()
}

export default useFullWidth
