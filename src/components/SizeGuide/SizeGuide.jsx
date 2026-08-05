import "./SizeGuide.css";
import { sizeGuide } from "./SizeGuideData";

function SizeGuide() {
  return (
    <div className="size-guide">

      {sizeGuide.map((section) => (

        <div
          key={section.title}
          className="size-table-section"
        >

          <div className="size-table-title">
            {section.title}
          </div>

          <table className="size-table">

            <thead>

              <tr>

                {section.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}

              </tr>

            </thead>

            <tbody>

              {section.rows.map((row, index) => (

                <tr key={index}>

                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ))}

      <div className="fit-note">

        <h4>FIT NOTE</h4>

        <p>
          Please order in UK sizes for UK brands and EU sizes for European
          brands. If you're between sizes, choose the larger size for a roomier fit.
        </p>

      </div>

    </div>
  );
}

export default SizeGuide;