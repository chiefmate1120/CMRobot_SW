/*
 * movingAveragetFilter.cpp
 *
 * Author: Feijian.Ni
 * Date: 2020.4.6
 */

#include "movingAverageFilter.hpp"

namespace cmr {
//! constructors and destructor
template <typename T>
movingAverageFilter<T>::movingAverageFilter() : m_length(0) {}

template <typename T> movingAverageFilter<T>::~movingAverageFilter() {}

//！ init the filter
template <typename T> cmrErrorType movingAverageFilter<T>::init(int length) {
  if (length < 0)
    return CMR_OUT_RANGE;
  m_length = length;
  m_dataPool.clear();
}

//! filt the data
template <typename T> T movingAverageFilter<T>::runFilter(T data) {
  T dataSum = m_filterResult * m_dataPool.size();

  //! update data pool
  if (m_dataPool.size() >= m_length) {
    dataSum = dataSum - m_dataPool[0];
    m_dataPool.erase(m_dataPool.begin());
  }
  m_dataPool.push_back(data);
  dataSum = dataSum + data;

  //! compute averate
  m_filterResult = dataSum / m_dataPool.size();

  return m_filterResult;
}

} // namespace cmr