import React from 'react';
import type { ProjectBlock } from '../core/projects.js';
import type { FooterConfig } from '../config.js';
export declare function ProjectsView({ blocks, footer }: {
    blocks: ProjectBlock[];
    footer?: string | FooterConfig;
}): React.JSX.Element;
