const has = (value: string[]) => {
  let isExist = false;
  const btnAuthStr: string | null = sessionStorage.getItem('btnAuth');
  if (btnAuthStr === undefined || btnAuthStr === null) {
    return false;
  }
  if (value.indexOf(btnAuthStr) > -1) {
    isExist = true;
  }
  return isExist;
};

const checkBtnAuth = {
  mounted(el: any, binding: any, vnode: any) {
    const meta = binding.instance.$router.currentRoute.value.meta;
    if (!has(meta.btnAuth) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },
};

export default checkBtnAuth;
