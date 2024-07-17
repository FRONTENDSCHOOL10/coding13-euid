import pb from '@/api/pocketbase';

export class UserService {
  static initializeState(state) {}

  /** 페이지별로 한 번씩만 불러와서 재사용하기 */
  static async currentUser(shouldRedirect = true) {
    // https://github.com/pocketbase/pocketbase/discussions/1390#discussioncomment-4498324
    if (pb.authStore.isValid) {
      try {
        // 많이 느림, await 대신 async로 그냥.. 데이터를 나중에 rerender해야하나...
        await pb.collection('users').authRefresh();

        return pb.authStore.model;
      } catch (error) {
        if (error?.response?.code === 401) {
          window.location.href = '/pages/start/';
          pb.authStore.clear();
        } else {
          throw error;
        }
      }
    }

    if (shouldRedirect) {
      window.location.href = '/pages/start/';
    } else {
      return null;
    }
  }

  static localCurrentUser(shouldRedirect = true) {
    // https://github.com/pocketbase/pocketbase/discussions/1390#discussioncomment-4498324
    if (pb.authStore.isValid) {
      return pb.authStore.model;
    }

    if (shouldRedirect) {
      window.location.href = '/pages/start/';
    } else {
      return null;
    }
  }

  static logout() {
    pb.authStore.clear();
    window.location.href = '/pages/start/';
  }

  static async login(phoneNumber) {
    // 우리는 username과 pw를 이용해 로그인하는 방식이 아님. 우리가 알고 있는 유일한 정보는 휴대폰 번호기 때문에 그것을 이용해 해당 휴대폰 번호를 가진 유저를 찾아, 그 유저의 포켓베이스에 등록된 username을 가져옴, pw는 phone_number과 동일하게 설정해둠.
    const user = await pb.collection('users').getFirstListItem(`phone_number="${phoneNumber}"`);

    if (!user) {
      return null;
    }

    // 비밀번호는 우선 휴대폰 번호로 설정
    const authData = await pb.collection('users').authWithPassword(user.username, phoneNumber);

    // model = user
    return authData.model;
  }

  static async registerUser(phoneNumber) {
    const user = await pb.collection('users').create({
      phone_number: phoneNumber,
      password: phoneNumber,
      passwordConfirm: phoneNumber,
    });
    return user;
  }

  static async updateUser(id, values) {
    const user = await pb.collection('users').update(id, values);
    return user;
  }
}
