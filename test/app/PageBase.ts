

import { Workspace } from "./Workspace";
import { ThenableWebDriver } from "selenium-webdriver";

export class PageBase
{
    protected driver:ThenableWebDriver;
    protected workspace:Workspace;

    constructor(workspace:Workspace)
    {
        this.workspace = workspace;
        this.driver = workspace.driver;
    }
}