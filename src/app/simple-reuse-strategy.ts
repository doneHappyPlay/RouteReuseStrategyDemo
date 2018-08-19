/**
 * Created by dhp on 2018/8/15.
 */
// tslint:disable
import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

  _cacheRouters: { [key: string]: any } = {};

  //  是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log('判断是否允许复用路由');
    // 对所有路由允许复用
    return true;
  }

  //  当用户离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log(handle);
    console.log(route);
    console.log('当用户离开时会触发，存储路由');
    // 按path作为key存储路由快照&组件当前实例对象
    // path等同RouterModule.forRoot中的配置
    this._cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle: handle
    };
    console.log(this._cacheRouters);
  }

  //  是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('是否允许还原路由');
    // 在缓存中有的都认为允许还原路由
    return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('拿到路由快照并构建组件');
    // 从缓存中获取快照，若无则返回null
    if (!route.routeConfig || !this._cacheRouters[route.routeConfig.path]) return null;
    return this._cacheRouters[route.routeConfig.path].handle;
  }

  //  进入路由时触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log('进入路由时触发，是否同一路由时复用路由');
    // 同一路由时复用路由
    return future.routeConfig === curr.routeConfig;
  }
}
