export type Certification = {
    title: string;
    image: string;
    level: string;
};
export type CertificationGroup = {
    org: string;
    logo: string;
    certifications: Certification[];
};
export declare function parseCertificationGroups(content: string): CertificationGroup[];
export declare function parseCertificationDirective(content: string): {
    title: string;
    groups: CertificationGroup[];
} | undefined;
export declare function certificationGroupsHtml(title: string, groups: CertificationGroup[]): string;
