const useFeatureFlag = feature => {
  // eslint-disable-next-line eqeqeq
  const isEnabled = feature === 'true'
  return isEnabled
}

export default useFeatureFlag
