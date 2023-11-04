import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TextRun,
  Header,
  Footer,
  Table,
  TableRow,
  TableCell,
  WidthType,
  SectionType,
  convertInchesToTwip,
  PageNumber,
  ExternalHyperlink,
} from "docx";
export class DocumentCreator {
  //  Sector Name
  sectorName(sector) {
    let sName = [];
    if (sector.length > 0) {
      sector.forEach((element, index) => {
        console.log(element.sector_name, index);
        sName.push(
          new TextRun({
            text: `${element.sector_name}, `,
          })
        );
      });
    }
    return sName;
  }
  // Sub project budget, Loan Outstanding, Liabilities
  generateRows = (data) =>
    data.map(
      ({ id, name, amount }) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(id ? id.toString() : "N/A")],
            }),
            new TableCell({
              children: [new Paragraph(name)],
            }),
            new TableCell({
              children: [new Paragraph(amount ? amount.toString() : "N/A")],
            }),
          ],
        })
    );
  // MeCoverage
  generateMeCoverageRows = (data) =>
    data?.map(
      ({
        id,
        me_in_cluster_male,
        me_in_cluster_femaile,
        me_covered_by_po_male,
        me_covered_by_po_female,
        direct_me_loan_male,
        direct_me_loan_female,
        indirect_me_benefitted_male,
        indirect_me_benefitted_female,
        po_branch_id,
      }) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(id ? id.toString() : "null")],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  me_in_cluster_male ? me_in_cluster_male.toString() : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  me_in_cluster_femaile
                    ? me_in_cluster_femaile.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  me_covered_by_po_male
                    ? me_covered_by_po_male.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  me_covered_by_po_female
                    ? me_covered_by_po_female.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  direct_me_loan_male ? direct_me_loan_male.toString() : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  direct_me_loan_female
                    ? direct_me_loan_female.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  indirect_me_benefitted_male
                    ? indirect_me_benefitted_male.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  indirect_me_benefitted_female
                    ? indirect_me_benefitted_female.toString()
                    : "null"
                ),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  po_branch_id != null ? po_branch_id.toString() : "null"
                ),
              ],
            }),
          ],
        })
    );
  // Stakeholders Cluster
  generateStakeholdersRows = (data) =>
    data.map(
      ({ id, stakeholder, direct, indirect, agroecological_id }) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(id ? id.toString() : "null")],
            }),
            new TableCell({
              children: [new Paragraph(stakeholder)],
            }),
            new TableCell({
              children: [new Paragraph(direct ? direct.toString() : "null")],
            }),
            new TableCell({
              children: [
                new Paragraph(indirect ? indirect.toString() : "null"),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  agroecological_id ? agroecological_id.toString() : "null"
                ),
              ],
            }),
          ],
        })
    );
  // Detail Actvity and Sub Activity
  generateActivityRows = (data) => {
    let activityArray = [];

    data.forEach((element) => {
      element.content.forEach(
        ({
          id,
          issues,
          main_activity,
          sub_activity,
          rationality,
          timeline,
          po_activity,
          me_activity,
          others_activity,
        }) => {
          activityArray.push(
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph(id ? id.toString() : "null")],
                }),
                new TableCell({
                  children: [new Paragraph(issues ? issues : "null")],
                }),
                new TableCell({
                  children: [
                    new Paragraph(main_activity ? main_activity : "null"),
                  ],
                }),
                new TableCell({
                  children: [
                    new Paragraph(sub_activity ? sub_activity : "null"),
                  ],
                }),
                new TableCell({
                  children: [new Paragraph(rationality ? rationality : "null")],
                }),
                new TableCell({
                  children: [new Paragraph(timeline ? timeline : "null")],
                }),
                new TableCell({
                  children: [new Paragraph(po_activity ? "Yes" : "No")],
                }),
                new TableCell({
                  children: [new Paragraph(me_activity ? "Yes" : "No")],
                }),
                new TableCell({
                  children: [new Paragraph(others_activity ? "Yes" : "No")],
                }),
              ],
            })
          );
        }
      );
    });
    return activityArray;
  };

  // Main Create function
  create(data) {
    const selectedPO = data["po_org_infos"].po_details;
    const poOrgData = data["po_org_infos"];
    const budgetData = data.sub_project_budgets;
    const loanOutStandData = data.dspploadnotstands;
    const liabilityData = data.dsppliabs;
    const meCoverageData = data.me_coverages;
    const stakeholderData = data.stakeholder_clusters;
    const activityData = data.detailsubacts;
    const sector = data.sector;
    const othersData = data.otherinfos;

    const filePath = process.env.VUE_APP_API_BASE_URL;

    // Table of general information
    const tableGeneral = new Table({
      // Adding margin to the table contents
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: data.id ? data.id.toString() : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "SPCN ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.spcn_id ? data.spcn_id : "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PO Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: selectedPO.po_name_en ?? "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PO Name(Bangla):",

                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: selectedPO.po_name_bn ?? "null",
                  style: "bdNormal",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Sector Name:",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: this.sectorName(sector),
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Title Of Sub Project:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.title_sub_project ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "DSPP Date:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.dspp_date ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Approved Date:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.approved_date ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Closing Date:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.closing_date ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Type Of Proposal:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.type_proposal ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ECR Class:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.ECR_Class ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Objectives:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.objectives ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Duration by year:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph(data.duration_year.toString() ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Duration by Month:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph(
                  data.duration_month.toString() == 1
                    ? "January"
                    : data.duration_month.toString()
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Total Budget:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph(
                  data.total_budget ? data.total_budget.toString() : "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "DSPP Status:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.status.toString() ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Comment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.comment ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Reason:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.reason ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Grade:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.grade ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name Of Cluster:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [new Paragraph(data.name_of_cluster ?? "null")],
            }),
          ],
        }),
      ],
    });
    // Table of PO Organization Information
    const tablePoOrgInfo = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: poOrgData.id ? poOrgData.id.toString() : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PO Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: selectedPO.po_name_en ?? "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Total Permanent Staff:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: poOrgData.total_parmanent_staff
                    ? poOrgData.total_parmanent_staff.toString()
                    : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Total SEP Staff:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: poOrgData.total_sep_staff
                    ? poOrgData.total_sep_staff.toString()
                    : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Total Asset:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  text: poOrgData.total_asset
                    ? poOrgData.total_asset.toString()
                    : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Organization Structure:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                // new Paragraph(poOrgData.org_structure),

                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: poOrgData.org_structure
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: poOrgData.org_structure
                        ? `${filePath}/storage/${poOrgData.org_structure}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    // Table of sub Porject budget
    const tableBudget = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  // heading: HeadingLevel.HEADING_4,
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Amount:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...this.generateRows(budgetData),
      ],
    });
    // Table of Loan Outstanding
    const tableLoanOutStanding = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  // heading: HeadingLevel.HEADING_4,
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Amount:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...this.generateRows(loanOutStandData),
      ],
    });
    // Table of Liabilities
    const tableLiabilities = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  // heading: HeadingLevel.HEADING_4,
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Amount:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...this.generateRows(liabilityData),
      ],
    });
    // Table of MeCoverage
    const tableCoverage = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  // heading: HeadingLevel.HEADING_4,
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ME In Cluster Male:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ME In Cluster Female:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ME Covered by PO Male:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ME Covered By PO Female:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Direct ME Loan Male:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Direct Me Loan Female:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Indirect ME Benefitted Male:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Indirect ME Benefitted Female:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PO Branch:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...this.generateMeCoverageRows(meCoverageData),
      ],
    });
    // Table of Stakeholders Cluster
    const tableStakeholders = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  // heading: HeadingLevel.HEADING_4,
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Stakeholder Name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Direct:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Indirect:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Agro ecological:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...this.generateStakeholdersRows(stakeholderData),
      ],
    });
    // Table of Detail and sub activity
    const tableActivity = new Table({
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      columnWidths: [3505, 5505],

      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Issues:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Main Activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Sub Activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Rationality:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Timeline:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PO Activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ME Activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: {
                size: 5505,
                type: WidthType.DXA,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Others Activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            // new TableCell({
            //   width: {
            //     size: 5505,
            //     type: WidthType.DXA,
            //   },
            //   children: [
            //     new Paragraph({
            //       children: [
            //         new TextRun({
            //           text: "dspp_detail_actsubact_id:",
            //           bold: true,
            //           // size: 40,
            //         }),
            //       ],
            //     }),
            //   ],
            // }),
          ],
        }),
        ...this.generateActivityRows(activityData),
      ],
    });
    // Others Information
    const tableOthers = new Table({
      // Adding margin to the table contents
      margins: {
        top: convertInchesToTwip(0.05),
        bottom: convertInchesToTwip(0.05),
        right: convertInchesToTwip(0.05),
        left: convertInchesToTwip(0.05),
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "ID:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: othersData.id ? othersData.id.toString() : "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  wordWrap: true,
                  children: [
                    new TextRun({
                      text: "ME and community consulted activities and sub activities:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.me_and_community_consulted_activities_and_sub_activities ??
                    "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Sub project management structure:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: othersData.sub_project_management_structure ?? "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Sub project experience attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: othersData.sub_project_experience_attachment ?? "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Sub project reporting system:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: othersData.sub_project_reporting_system ?? "null",
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Existing infrastructure & equipment of the organization at working area:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.existing_infr_equ_org_in_working_area ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Project monitoring evaluation process attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.project_monitoring_evaluation_process_attachment),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.project_monitoring_evaluation_process_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.project_monitoring_evaluation_process_attachment
                        ? `${filePath}/storage/${othersData.project_monitoring_evaluation_process_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Working plan attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.working_plan_attachment),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.working_plan_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.working_plan_attachment
                        ? `${filePath}/storage/${othersData.working_plan_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Risk analysis attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.risk_analysis_attachment ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Project activities attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.project_activities_attachment ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Exit strategy:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.exit_strategy ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Describe overlapping issue:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.describe_overlapping_issue ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Budget break down attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.budget_break_down_attachment),
                new Paragraph({
                  children: [
                    // new TextRun("Click here"),
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.budget_break_down_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.budget_break_down_attachment
                        ? `${filePath}/storage/${othersData.budget_break_down_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Financing planning attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.financing_planing_attachment ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Financial accounts:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.financial_accounts ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Audit process",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.audit_process ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Funding mechanism:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.funding_mechanism ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name of financial focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.name_financial_focal_person ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Annual procurement plan attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.annual_procurement_plan_attachment),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.annual_procurement_plan_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.annual_procurement_plan_attachment
                        ? `${filePath}/storage/${othersData.annual_procurement_plan_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Procurement and administration process:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.procurement_and_administration_process ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Procurement and administration process:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.procurement_and_administration_process ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Proposal evaluation committee:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.proposal_evaluation_committee ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name of procurement focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.procurement_and_administration_process ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Is support emf:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.is_support_emf ? "Yes" : "No"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Is support smf:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.is_support_smf ? "Yes" : "No"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Is support tpf:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.is_support_tpf ? "Yes" : "No"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Environmental screening format attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(
                //   othersData.environmental_screening_format_attachment
                // ),

                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.environmental_screening_format_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.environmental_screening_format_attachment
                        ? `${filePath}/storage/${othersData.environmental_screening_format_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name of environmental focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.name_environmental_focal_person ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Social screening format attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.social_screening_format_attachment),
                new Paragraph({
                  children: [
                    // new TextRun("Click here"),
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.social_screening_format_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.social_screening_format_attachment
                        ? `${filePath}/storage/${othersData.social_screening_format_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "name of social focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.name_social_focal_person ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Social tribal people format attachment:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(
                //   othersData.social_tribal_people_format_attachment
                // ),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.social_tribal_people_format_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.social_tribal_people_format_attachment
                        ? `${filePath}/storage/${othersData.social_tribal_people_format_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name of tribal people focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  othersData.name_tribal_people_focal_person ?? "null"
                ),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Is there grm:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.is_there_grm ? "Yes" : "No")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Name of grm focal person:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.name_grm_focal_person ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "EMP based sub activity:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(
                //   othersData.emp_attachment ? othersData.emp_attachment : "N/A"
                // ),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.emp_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.emp_attachment
                        ? `${filePath}/storage/${othersData.emp_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Other documents:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(
                //   othersData.other_attachment
                //     ? othersData.other_attachment
                //     : "N/A"
                // ),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.other_attachment
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.other_attachment
                        ? `${filePath}/storage/${othersData.other_attachment}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Process certificate:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.process_certificate ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Certificate date:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.certificate_date ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Product certificate:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(othersData.product_certificate ?? "null"),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Certificate name:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.certificate_name ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Designation:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [new Paragraph(othersData.designation ?? "null")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Signature:",
                      bold: true,
                      // size: 40,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                // new Paragraph(othersData.signature),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: othersData.signature
                            ? "Download Attachment"
                            : "null",
                          style: "Hyperlink",
                        }),
                      ],
                      link: othersData.signature
                        ? `${filePath}/storage/${othersData.signature}`
                        : "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    // Creating document
    //   margins: {
    //     top: convertInchesToTwip(0.05),
    //     bottom: convertInchesToTwip(0.05),
    //     right: convertInchesToTwip(0.05),
    //     left: convertInchesToTwip(0.05),
    //   },
    //   columnWidths: [3505, 5505],
    //   rows: [
    //     new TableRow({
    //       children: [
    //         new TableCell({
    //           width: {
    //             size: 3505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               // heading: HeadingLevel.HEADING_4,
    //               children: [
    //                 new TextRun({
    //                   text: "ID:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "issues:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "main_activity:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "sub_activity:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "rationality:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "timeline:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "po_activity:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "me_activity:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "others_activity:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //         new TableCell({
    //           width: {
    //             size: 5505,
    //             type: WidthType.DXA,
    //           },
    //           children: [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({
    //                   text: "dspp_detail_actsubact_id:",
    //                   bold: true,
    //                   // size: 40,
    //                 }),
    //               ],
    //             }),
    //           ],
    //         }),
    //       ],
    //     }),
    //     ...this.generateActivity2Rows(),
    //   ],
    // });
    const document = new Document({
      styles: {
        default: {
          document: {
            run: {
              language: {
                value: "es-ES",
              },
            },
          },
        },
        paragraphStyles: [
          {
            id: "bdNormal",
            name: "Bangla - Bangladesh",
            basedOn: "Normal",
            next: "Normal",
            run: {
              color: "999999",
              language: {
                value: "bn-BD",
              },
            },
          },
        ],
      },
      sections: [
        // Section 1:General Information
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  heading: HeadingLevel.HEADING_3,
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "Payroll Management System",
                      bold: true,
                      size: 30,
                      color: "68B984",
                    }),
                  ],
                }),
                new Paragraph({
                  heading: HeadingLevel.TITLE,
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "Detail Sub Project Proposal",
                      bold: true,
                      size: 20,
                      color: "379237",
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    // new TextRun("DSPP Details. "),
                    new TextRun({
                      children: ["Page Number: ", PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [" to ", PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
              text: "1. General Information",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            tableGeneral,
          ],
        },
        // Section 2:PO Organization Information
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "2. PO Organization",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tablePoOrgInfo,
          ],
        },
        // Section 3: Sub Project Budget
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "3. Sub Project Budget",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableBudget,
          ],
        },
        // Section 4: Loan Outstanding
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },

          children: [
            new Paragraph({
              text: "4. Loans Outstanding",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableLoanOutStanding,
          ],
        },
        // Section 5: Liabilities
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "5. Liabilities",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableLiabilities,
          ],
        },
        // Section 6: ME Coverage
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "6. ME Coverage",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableCoverage,
          ],
        },
        // Section 7: Stakeholder Cluster
        {
          properties: {
            type: SectionType.NEXT_PAGE,
          },

          children: [
            new Paragraph({
              text: "7. Stakeholders Cluster",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableStakeholders,
          ],
        },
        // Section 8: Detail Activity and Sub Activity
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "8. Detail Activities and Sub Activities",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableActivity,
          ],
        },
        // Section 9
        {
          properties: {
            type: SectionType.CONTINUOUS,
          },

          children: [
            new Paragraph({
              text: "9. Others Information",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.START,
            }),
            // Specific table name section wise
            tableOthers,
          ],
        },
      ],
    });
    return document;
  }
}
