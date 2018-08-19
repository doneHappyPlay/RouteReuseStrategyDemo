/**
 * Created by dhp on 2018/8/15.
 */
// tslint:disable
import {RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';
import {InteractiveService} from "./interactive.service";

export class SimpleReuseStrategy implements RouteReuseStrategy {
  interactive = new InteractiveService();

  public static handles: { [key: string]: DetachedRouteHandle } = {};
  constructor() {
    console.log(this.interactive);
    console.log('进入构造函数');
    this.interactive.deleteEvent.subscribe((e) => {
      console.log(e);
    })
  }

  //  删除路由快照的方法
  public static deleteRouteSnapshot(path: string): void {
    const name = path.replace(/\//g, '_');
    if (SimpleReuseStrategy.handles[name]) {
      delete SimpleReuseStrategy.handles[name];
    }
  }

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
    SimpleReuseStrategy.handles[this.getRouteUrl(route)] = handle;
  }

  //  是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('是否允许还原路由');
    // 在缓存中有的都认为允许还原路由
    return !!SimpleReuseStrategy.handles[this.getRouteUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('拿到路由快照并构建组件');
    // 从缓存中获取快照，若无则返回null
    if (!SimpleReuseStrategy.handles[this.getRouteUrl(route)]) {
      return null;
    }
    return SimpleReuseStrategy.handles[this.getRouteUrl(route)];
  }

  //  进入路由时触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log('进入路由时触发，是否同一路由时复用路由');
    // 同一路由时复用路由
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify((curr.params));
  }

  getRouteUrl(route: ActivatedRouteSnapshot) {
    const path = route['_routerState'].url.replace(/\//g, '_');
    return path;
  }
}
