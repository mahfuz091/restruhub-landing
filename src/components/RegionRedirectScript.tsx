import { REGION_COOKIE } from "@/lib/region";
import type { Region } from "@/lib/geo";

interface Props {
  /** Region that must not stay on this page. */
  block: Region;
  /** Where visitors in that region are sent. */
  redirectTo: string;
}

/**
 * Blocking pre-paint redirect.
 *
 * Runs while the browser is still parsing the document — before the markup
 * below it is parsed and before React hydrates — so a visitor in the blocked
 * market never sees this page's content. A useEffect guard cannot do this: it
 * only runs after hydration, which is late enough to paint a full frame.
 *
 * Deliberately re-implements a slice of client-side-region.ts rather than
 * importing it. That module is an ES module evaluated after paint, and the
 * whole point here is to decide before anything renders. Only the signals
 * readable synchronously are checked (cookie, timezone, locale); the IP
 * lookup stays in RegionGuard, which handles what this misses.
 */
export default function RegionRedirectScript({ block, redirectTo }: Props) {
  const js = `(function(){try{
var m=document.cookie.match(/(?:^|;\\s*)${REGION_COOKIE}=([^;]*)/);
var r=m?decodeURIComponent(m[1]):"";
if(!r){
var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
if(tz==="Asia/Dhaka"||tz==="Asia/Dacca"){r="bd"}
else{var l=[navigator.language].concat(navigator.languages||[]);
for(var i=0;i<l.length;i++){if(/^bn([-_]|$)/i.test(l[i]||"")){r="bd";break}}}
}
if(r===${JSON.stringify(block)}){location.replace(${JSON.stringify(redirectTo)})}
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
