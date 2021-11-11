import HomeApi from 'src/pages/home/api'
import UserApi from 'src/pages/user/apis'
import AdminApi from 'src/pages/admin/apis'

export const apis = {
	home: new HomeApi(),
	user: new UserApi(),
	admin: new AdminApi()
}

export type IApis = typeof apis

