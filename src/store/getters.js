// ��ȡ��ǰ������Ự�����ĵ�״̬��Ϣ
const getters = {
  // ϵͳ����
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // �û��Զ�������
  language: state => state.settings.language,
  // �û���Ϣ
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  user_id: state => state.user.user_id,
  username: state => state.user.username,
  authmode: state => state.user.authmode,
  roles: state => state.user.roles,
  // Ȩ�޹���
  permission_routes: state => state.permission.routes, // ·����ʾȨ��
  
}
export default getters
