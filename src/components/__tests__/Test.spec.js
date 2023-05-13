import {render,screen} from '@testing-library/vue';
import { describe,it ,expect} from 'vitest';
import SideBar from '../basic_layout/SideBar.vue';

describe("SideBar",()=>{
    const viewText="Popular Songs";
    it('render correctly',async()=>{
        const viewId="viewId";
        render(SideBar,{
            props:{element:'xyz',id:viewId},

        });
        const view=await screen.findByText(viewText);
        expect(view.id).toBe(viewId)
    })
})