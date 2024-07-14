/**
 *
 * @param {string} time
 * @returns
 */

export default function calcTimeDifference(time) {
  // 현재시각과 시간차 계산
  const givenTime = new Date(time);
  const currentTime = new Date();
  const timeDifference = currentTime - givenTime;
  // 초, 분, 시, 일 단위 계산
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const month = Math.floor(days / 30);
  // 판매글 작성시간 삽입
  if (seconds < 60) return `${seconds}초전`;
  else if (minutes < 60) return `${minutes}분전`;
  else if (hours < 24) return `${hours}시간전`;
  else if (days < 7) return `${days}일전`;
  else if (days < 30) return `${weeks}주전`;
  else if (month < 12) return `${month}달전`;
  else return '오래전';
}
