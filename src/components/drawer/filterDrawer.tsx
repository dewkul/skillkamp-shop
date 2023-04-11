import { useFilterCtx } from "../../hooks/useFilter"
import { FilterProduct } from "../collection"
import Drawer from "../shared/drawer"

export function FilterDrawer() {
    const { isFilterDrawerOpen, closeFilterDrawer } = useFilterCtx()
    return (

        <Drawer
            header="Filter Products"
            isOpen={isFilterDrawerOpen}
            closeDrawer={closeFilterDrawer}
        >
            <FilterProduct id="drawer-" />
        </Drawer>
    )
}